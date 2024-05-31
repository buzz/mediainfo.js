import type { Track } from './MediaInfoResult'

/**
 * Checks if a given object is of a specified track type.
 *
 * @template T - The type of track to check for.
 * @param thing - The object to check.
 * @param type - The track type to check against.
 * @returns A boolean indicating whether the object is of the specified track type.
 */
function isTrackType<T extends Track['@type']>(
  thing: unknown,
  type: T
): thing is Extract<Track, { '@type': T }> {
  return thing !== null && typeof thing === 'object' && (thing as Track)['@type'] === type
}

export { isTrackType }
