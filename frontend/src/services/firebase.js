// firebase.js
export const db = {}; // Mock firebase database object
export const mockFirebaseSave = async (collection, data) => {
  console.log(`[Firebase] Saving to ${collection}:`, data);
  return new Promise((resolve) => setTimeout(() => resolve({ id: Date.now().toString(), ...data }), 500));
};

export const mockFirebaseCancel = async (id) => {
  console.log(`[Firebase] Cancelling subscription ${id}`);
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500));
};
