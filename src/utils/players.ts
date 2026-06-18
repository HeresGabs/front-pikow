export const AVATARS = ['🦊', '🐼', '🦁', '🐯', '🐨', '🐸', '🐵', '🐧']

export function avatar(index: number): string {
  return AVATARS[index % AVATARS.length] ?? '🎲'
}
