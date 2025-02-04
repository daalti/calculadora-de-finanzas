export const getGlossaryTerms = (): string[] => {
  const files = import.meta.glob("../../public/assets/glossary/*.md", {
    query: "?raw",
    eager: true,
  });

  return Object.keys(files).map((file) => {
    const filename = file.split("/").pop() || "";
    return filename.replace(".md", "");
  });
};

export const getTesisFiles = (): string[] => {
  const files = import.meta.glob("../../public/assets/tesis/*.md", {
    query: "?raw",
    eager: true,
  });

  return Object.keys(files).map((file) => {
    const filename = file.split("/").pop() || "";
    return filename.replace(".md", "");
  });
};

export const getBlogsFiles = (): string[] => {
  const files = import.meta.glob("../../public/assets/blogs/*.md", {
    query: "?raw",
    eager: true,
  });

  return Object.keys(files).map((file) => {
    const filename = file.split("/").pop() || "";
    return filename.replace(".md", "");
  });
};
