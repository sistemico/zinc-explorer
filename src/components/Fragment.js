import styled from 'styled-components'

const Fragment = styled.div`
  margin-bottom: 2rem;

  table {
    thead {
      th {
        &:nth-child(1),
        &:nth-child(5) {
          width: 10%;
        }
      }
    }
  }
`

export default Fragment
