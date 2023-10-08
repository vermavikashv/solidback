import fs from "fs-extra";
import path from "path";

export const bufferToFile = (file, folderPath) => {
  console.log("file,folderpath", file, folderPath);
  if (folderPath[folderPath.length - 1] !== "/") {
    folderPath += "/";
  }
  if (!folderPath.startsWith("/")) {
    folderPath = "/" + folderPath;
  }
  const fileBuffer = file[0].data;
  const mimeType = file[0].mimetype;
  const originalFileName = file[0].filename;

  let extension = originalFileName.split(".");
  const fileNameWithoutExtension = extension[0].replace(" ", "_");
  extension = extension[extension.length - 1];
  const newFileName = `${fileNameWithoutExtension}-${Date.now()}.${extension}`;
  // creating local path
  const sourcePath = `./public`;
  const filePath = path.resolve(sourcePath);
  const localPath = `${filePath}/${folderPath}`;
  if (!fs.existsSync(localPath)) {
    fs.mkdirSync(localPath, { recursive: true });
  }
  // saving file
  fs.writeFileSync(`${localPath}` + newFileName, fileBuffer, {
    encoding: "utf8",
  });

  if (!folderPath.endsWith("/")) {
    folderPath += "/";
  }

  const fileUrl = `/public${folderPath}${newFileName}`;
  return {
    fileUrl,
    mimeType,
  };
};
