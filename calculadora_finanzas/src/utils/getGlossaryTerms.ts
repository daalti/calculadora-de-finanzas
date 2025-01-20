export const getGlossaryTerms = (): string[] => {
  const files = import.meta.glob("../assets/glosary/*.md", {
    as: "raw",
    eager: true,
  });

  return Object.keys(files).map((file) => {
    const filename = file.split("/").pop() || "";
    return filename.replace(".md", "");
  });
};

export const getTesisFiles = (): string[] => {
  const files = import.meta.glob("../assets/tesis/*.md", {
    as: "raw",
    eager: true,
  });

  return Object.keys(files).map((file) => {
    const filename = file.split("/").pop() || "";
    return filename.replace(".md", "");
  });
};
