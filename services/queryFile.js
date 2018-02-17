module.exports = {
  addSkill: (inp) => {
    return `SELECT addSkill('${inp.name}', ${inp.status})`;
  }
}
