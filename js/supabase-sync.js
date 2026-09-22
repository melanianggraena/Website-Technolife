/* Cloud bridge: satu dokumen konten, dibaca publik dan hanya dapat diubah admin lewat RLS. */
window.SupabaseBridge = (() => {
  const config = window.SUPABASE_CONFIG || {};
  const ready = config.url?.startsWith('https://') && !config.publishableKey?.startsWith('PASTE_') && window.supabase;
  let client, isHydrating = false;
  const toast = (message, error = false) => window.showAdminToast?.(error ? 'Gagal sinkronisasi' : 'Supabase', message, error ? 'error' : 'success');

  async function boot() {
    if (!ready) return;
    client = window.supabase.createClient(config.url, config.publishableKey);
    const { data, error } = await client.from('site_content').select('payload, updated_at').eq('id', 'main').maybeSingle();
    if (error) return console.error('Supabase read failed:', error.message);
    if (data?.payload && window.TechnoDataStore) {
      isHydrating = true;
      TechnoDataStore.hydrate(data.payload);
      isHydrating = false;
    }
    window.dispatchEvent(new CustomEvent('technoStoreUpdated'));
    client.channel('site-content').on('postgres_changes', { event: '*', schema: 'public', table: 'site_content', filter: 'id=eq.main' }, payload => {
      if (payload.new?.payload && window.TechnoDataStore) {
        isHydrating = true;
        TechnoDataStore.hydrate(payload.new.payload);
        isHydrating = false;
      }
    }).subscribe();
  }
  async function save(payload) {
    if (!client || isHydrating) return;
    const { error } = await client.from('site_content').upsert({ id: 'main', payload, updated_at: new Date().toISOString() });
    if (error && !/row-level security/i.test(error.message)) toast(error.message, true);
  }
  async function signIn(email, password) {
    if (!client) throw new Error('Supabase belum dikonfigurasi. Isi js/supabase-config.js terlebih dahulu.');
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }
  async function signOut() { if (client) await client.auth.signOut(); }
  async function session() { return client ? (await client.auth.getSession()).data.session : null; }
  async function uploadImage(file) {
    if (!client) throw new Error('Supabase belum dikonfigurasi.');
    const extension = (file.name.split('.').pop() || 'jpg').replace(/[^a-z0-9]/gi, '');
    const path = `images/${crypto.randomUUID()}.${extension}`;
    const { error } = await client.storage.from('site-assets').upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    return client.storage.from('site-assets').getPublicUrl(path).data.publicUrl;
  }
  window.addEventListener('technoStoreUpdated', () => { if (!isHydrating && window.TechnoDataStore) save(TechnoDataStore.getAll()); });
  document.addEventListener('DOMContentLoaded', boot);
  return { ready, signIn, signOut, session, uploadImage };
})();
