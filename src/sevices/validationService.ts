export const fetchValidationRules = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/validations/draft?context=patch');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.validations;
  } catch (error) {
    console.error('Failed to fetch validation rules:', error);
    return null;
  }
};
