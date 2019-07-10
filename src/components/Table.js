import styled from 'styled-components'

const Table = styled.div`
  width: 100%;
  overflow: hidden;
  background: white;
  color: var(--backgroud-color);

  table {
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    max-width: 100%;

    thead {
      tr {
        &:first-child {
          border: none;
          height: 2.5rem;

          th {
            padding: 0 0.75rem;
            background-color: #edf0f5;
            color: var(--text-light-color);
            font-weight: 400;
            font-size: 16px;
            outline: none;
            text-align: left;

            &:first-child {
              border-radius: 4px 0 0 0;
              padding-left: 0.75rem;
            }

            &:last-child {
              border-radius: 0 4px 0 0;
            }
          }
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #edf0f5;
        box-sizing: content-box;
        cursor: pointer;

        &:last-child {
          border-width: 2px;
        }

        &:hover {
          background: none;
        }
      }

      td {
        font-size: 0.875rem;
        font-weight: 400;
        height: 2.5rem;
        padding: 0 0.75rem;

        span {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:first-child {
          padding-left: 0.75rem;
        }
      }
    }
  }
`

export default Table
