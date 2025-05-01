export const imageSrc = (fileID) =>
  `https://fra.cloud.appwrite.io/v1/storage/buckets/${
    import.meta.env.VITE_nestNexusProfile
  }/files/${fileID}/view?project=${import.meta.env.VITE_AppwriteID}&mode=admin`;
