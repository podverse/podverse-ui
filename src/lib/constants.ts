export const keyLeftArrow = 37
export const keyRightArrow = 39

export const getLinkClipHref = (id) => {
  return `/clip?id=${id}`
}

export const getLinkClipAs = (id) => {
  return `/clip/${id}`
}

export const getLinkEpisodeHref = (id) => {
  return `/episode?id=${id}`
}

export const getLinkEpisodeAs = (id) => {
  return `/episode/${id}`
}

export const getLinkPodcastHref = (id) => {
  return `/podcast?id=${id}`
}

export const getLinkPodcastAs = (id) => {
  return `/podcast/${id}`
}
