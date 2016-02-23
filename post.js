return function(cb) {
  return Module({
    memoryInitializerPrefixURL: 'js/',
    onRuntimeInitialized: cb
  });
};
}));
