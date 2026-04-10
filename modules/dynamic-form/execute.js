// Dynamic Form Widget module - Passthrough
module.exports = async function execute(inputs, params) {
  return {
    schema: inputs?.schema || {},
    submit_label: params?.submit_label || 'Envoyer'
  };
};
