// Media Viewer Widget module - Passthrough
module.exports = async function execute(inputs, params) {
  return {
    url: inputs?.url || '',
    type: inputs?.type || params?.default_type || 'image'
  };
};
