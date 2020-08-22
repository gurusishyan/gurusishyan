// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  sector: [
    { label: 'Government', value: 'government', },
    { label: 'Private', value: 'private' }
  ],
  board_of_education: [
    { label: 'CBSE', value: 'cbse' },
    { label: 'State Board', value: 'state_board' },
  ],
  classes: [
    { label: 'Kindergarten', value: 'kindergarten' },
    { label: 'I', value: '1' },
    { label: 'II', value: '2' },
    { label: 'III', value: '3' },
    { label: 'IV', value: '4' },
    { label: 'V', value: '5' },
    { label: 'VI', value: '6' },
    { label: 'VII', value: '7' },
    { label: 'VIII', value: '8' },
    { label: 'IX', value: '9' },
    { label: 'X', value: '10' },
  ],
  subjects: [
    { label: 'Tamil', value: 'tamil' },
    { label: 'English', value: 'english' },
    { label: 'Maths', value: 'maths' },
    { label: 'Physics', value: 'physics' },
    { label: 'Chemistry', value: 'chemistry' },
    { label: 'Botany', value: 'botany' },
    { label: 'Zoology', value: 'zoology' },
    { label: 'History', value: 'history' },
    { label: 'Civics', value: 'civics' },
    { label: 'Geography', value: 'geography' },
  ]
};
