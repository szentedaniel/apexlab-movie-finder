import { gql } from "@apollo/client/core"

export const GET_MOVIES = gql`
    query SearchMovies($name: String!) {
      searchMovies(query: $name) {
        id
        name
        score
        genres {
          id
          name
        }
        languages {
          code
          name
        }
        overview
        releaseDate
        poster {
          thumbnail
        }
        cast {
          id
          person {
            name
          }
          role {
            ... on Cast {
              character
            }
          }
        }
      }
    }
  `

export const GET_MOVIE_FROM_ID = gql`
    query getMovie($id: ID!) {
      movie(id: $id) {
        id
        name
        score
        genres {
          id
          name
        }
        languages {
          code
          name
        }
        overview
        releaseDate
        img: poster {
          url: custom(size: "w185_and_h278_bestv2")
        }
        popularity
        cast(limit: 5) {
          id
          person {
            name
          }
          role {
            ... on Cast {
              character
            }
          }
        }
        crew(limit: 5) {
          id
          person {
            name
          }
          role {
            ... on Crew {
              job
              department
            }
          }
        }
      }
    }
  `

export const GET_SIMILAR_FROM_ID = gql`
    query getSimilar($id: ID!) {
      movie(id: $id) {
        id
        name
        similar {
          id
          name
          score
          genres {
            id
            name
          }
          languages {
            code
            name
          }
          overview
          releaseDate
          poster {
            thumbnail
          }
          cast {
            id
            person {
              name
            }
            role {
              ... on Cast {
                character
              }
            }
          }
        }
      }
    }
  `
