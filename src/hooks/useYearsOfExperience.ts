export function useYearsOfExperience(startDate: Date): number {
  const now = new Date();
  const years = now.getFullYear() - startDate.getFullYear();
  const hasPassedAnniversary =
    now.getMonth() > startDate.getMonth() ||
    (now.getMonth() === startDate.getMonth() && now.getDate() >= startDate.getDate());
  return hasPassedAnniversary ? years : years - 1;
}

export function getYearsOfExperience(): number {
  const startDate = new Date(2021, 11, 1); // December 2021
  const now = new Date();
  const years = now.getFullYear() - startDate.getFullYear();
  const hasPassedAnniversary =
    now.getMonth() > startDate.getMonth() ||
    (now.getMonth() === startDate.getMonth() && now.getDate() >= startDate.getDate());
  return hasPassedAnniversary ? years : years - 1;
}
