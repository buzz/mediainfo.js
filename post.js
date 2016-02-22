return function(cb) {
  return Module({
    onRuntimeInitialized: cb
  });
};
}));
