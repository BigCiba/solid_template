'use strict'; const exports = {}; GameUI.__loadModule('EOMDesign', exports); const require = GameUI.__require;

var libs = require('./libs.js');

function useComponentProps(props, options) {
  const merged = options.defaultValues ? libs.mergeProps(options.defaultValues, props) : props;
  const [local, others] = libs.splitProps(merged, options.localKeys);
  const mergedClass = libs.classNames(options.componentClass, props.class);
  return {
    local,
    others,
    mergedClass
  };
}
function useSimpleProps(props, options) {
  const {
    local,
    others,
    mergedClass
  } = useComponentProps(props, options);
  return {
    local,
    others: {
      ...others,
      class: mergedClass
    }
  };
}

exports.useSimpleProps = useSimpleProps;
