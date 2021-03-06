import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'

import Fragment from '../components/Fragment'
import Table from '../components/Table'
import Timestamp from '../components/formatters/Timestamp'

const getAllClaimsQuery = gql`
  query getClaims {
    claimSets(first: 100, orderBy: updatedAt, orderDirection: desc) {
      id
      subject
      issuer
      key
      data
      updatedAt
      transaction
    }
  }
`

const Registry = () => {
  const { loading, error, data: { claimSets: data } = {} } = useQuery(getAllClaimsQuery)

  if (loading) {
    return <h3>Loading data...</h3>
  }

  if (error) {
    return <h2>{error.message}</h2>
  }

  return (
    <Fragment>
      <h3>Registry: 0x0D416ffd6964Fd122ee13d9a229fd3bb08B2deEc</h3>

      <Table>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Issuer</th>
              <th>Subject</th>
              <th>Digital Fingerprint</th>
              <th>Age</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, data: fingerprint, issuer, subject, transaction, updatedAt: timestamp }) => (
              <tr key={id}>
                <td>
                  <span>Reference</span>
                </td>
                <td>
                  <Link to={`/${issuer}`}>
                    <span>{issuer}</span>
                  </Link>
                </td>
                <td>
                  <Link to={`/${subject}`}>
                    <span>{subject}</span>
                  </Link>
                </td>
                <td>
                  <span>{fingerprint && fingerprint.substring(2)}</span>
                </td>
                <td>
                  <Timestamp value={timestamp} />
                </td>
                <td>
                  <Link to={`/tx/${transaction}`}>
                    <span>{transaction}</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </Fragment>
  )
}

export default Registry
