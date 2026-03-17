/**
 * 
 * @param weight The weight of this Pokémon in hectograms.
 * @returns 
 */
const formatWeight = (weight: number) => `${(weight / 10).toFixed(1)} kg`;
export default formatWeight;
