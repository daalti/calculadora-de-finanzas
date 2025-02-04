export const getGlossaryTerms = (): string[] => {
  const files = import.meta.glob("../assets/glosary/*.md", {
    query: "?raw",
    eager: true,
  });

  return Object.keys(files).map((file) => {
    const filename = file.split("/").pop() || "";
    return filename.replace(".md", "");
  });
};

export const getTesisFiles = (): string[] => {
  const files = import.meta.glob("../assets/tesis/*.md", {
    query: "?raw",
    eager: true,
  });

  return Object.keys(files).map((file) => {
    const filename = file.split("/").pop() || "";
    return filename.replace(".md", "");
  });
};

export const getBlogsFiles = (): string[] => {
  const files = import.meta.glob("../assets/blogs/*.md", {
    query: "?raw",
    eager: true,
  });

  return Object.keys(files).map((file) => {
    const filename = file.split("/").pop() || "";
    return filename.replace(".md", "");
  });
};
