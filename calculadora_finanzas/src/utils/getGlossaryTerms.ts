export const getGlossaryTerms = async (): Promise<string[]> => {
  const response = await fetch("/assets/glosary/index.json");
  const files: string[] = await response.json();

  return files.map((file) => file.replace(".md", ""));
};

export const getTesisFiles = async (): Promise<string[]> => {
  const response = await fetch("/assets/tesis/index.json");
  const files = await response.json();
  return files.map((filename: string) => filename.replace(".md", ""));
};

export const getBlogsFiles = async (): Promise<string[]> => {
  const response = await fetch("/assets/blogs/index.json");
  const files = await response.json();
  return files.map((filename: string) => filename.replace(".md", ""));
};
