return function(cb) {
  return Module({
    memoryInitializerPrefixURL: './',
    onRuntimeInitialized: cb
  });
};
}));
