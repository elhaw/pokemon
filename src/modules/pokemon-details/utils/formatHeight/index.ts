/**
 * 
 * @param height The height of this Pokémon in decimetres. 
 * @returns 
 */
const formatHeight = (height: number) => `${(height / 10).toFixed(1)} m`;
export default formatHeight;
