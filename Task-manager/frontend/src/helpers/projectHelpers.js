export const populateProjectList = (projects) => {
  const projectMap = new Map();

  projects.forEach((project) => {
    projectMap.set(project._id, { ...project, subProjects: [] });
  });

  projects.forEach((project) => {
    if (project.subProjects && project.subProjects.length > 0) {
      project.subProjects.forEach((subProjectId) => {
        if (projectMap.has(subProjectId)) {
          projectMap
            .get(project._id)
            .subProjects.push(projectMap.get(subProjectId));
        }
      });
    }
  });

  const nestedProjects = projects.filter(
    (project) => !projects.some((p) => p.subProjects.includes(project._id))
  );

  return nestedProjects.map((project) => projectMap.get(project._id));
};
