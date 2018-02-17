module.exports = {
  addSkill: (inp) => {
    return `SELECT addSkill('${inp.name}', ${inp.status})`;
  },

  getSkills: () => {
    return `SELECT id, name, status FROM mstSkills`;
  },

  updateSkill: (id, name, status, cmdType) => {
    return `SELECT updateSkill(${id}, ${name}, ${status}, '${cmdType}')`;
  }
}
