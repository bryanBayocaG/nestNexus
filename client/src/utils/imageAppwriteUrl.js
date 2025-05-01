export const imageSrc = (fileID) => {
  if (
    typeof fileID === "string" &&
    (fileID.startsWith("http://") || fileID.startsWith("https://"))
  ) {
    return fileID;
  }

  return `https://fra.cloud.appwrite.io/v1/storage/buckets/${
    import.meta.env.VITE_nestNexusProfile
  }/files/${fileID}/view?project=${import.meta.env.VITE_AppwriteID}&mode=admin`;
};
