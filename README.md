# file-manager
Console app for basic file system operations

# NB!

1. If **AT LEAST** one of the parameters that you pass to `cp`, `mv`, `rn`, `compress`, `decompress` commands includes spaces in the name, please wrap **BOTH** parameters into double quotes (`""`) for the commands to work correctly:

```javascript
cp "path_to_file" "destination_path"
```

2. To avoid side effects with file extensions while compressing and decompressing files, the second parameter of `compress` and `decompress` commands is considered a directory (**not a file**). Archive will have the same name as the original file plus `.br` extension, and decompressed file will have the same name as the archive minus `.br` extension.
