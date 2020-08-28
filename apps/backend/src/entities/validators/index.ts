import { globalConfig } from '@gurusishyan-config';

const validateBoardOfEducation = (board_of_education: string) => {
  if (globalConfig.board_of_education.includes(board_of_education)) return true;
  return false;
};

const validateTeachingSector = (teaching_sector: string) =>
  globalConfig.teaching_sector.includes(teaching_sector);

const validateClassesHandled = (class_handled: string) =>
  globalConfig.classes.includes(class_handled);

const validateSubjectsHandled = (subjects_dealt: string) =>
  globalConfig.subjects.includes(subjects_dealt);

export const customValidator = {
  validateBoardOfEducation,
  validateTeachingSector,
  validateSubjectsHandled,
  validateClassesHandled,
};
