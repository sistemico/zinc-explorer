import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Link, Redirect } from 'react-router-dom'
import gql from 'graphql-tag'

import Fragment from '../components/Fragment'
import Table from '../components/Table'
import Timestamp from '../components/formatters/Timestamp'

const getClaimsByTransactionQuery = gql`
  query getClaimsByTransaction($hash: String!) {
    claimSets(first: 100, orderBy: updatedAt, orderDirection: desc, where: { transaction: $hash }) {
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

const Transaction = ({ match }) => {
  const { loading, error, data: { claimSets: data } = {} } = useQuery(getClaimsByTransactionQuery, {
    variables: { hash: match.params.hash },
  })

  if (loading) {
    return <h3>Loading data...</h3>
  }

  if (error) {
    return <Redirect to="/" />
  }

  return (
    <Fragment>
      <h3>Transaction Id: {match.params.hash}</h3>

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
                  {transaction === match.params.hash ? (
                    <span>{transaction}</span>
                  ) : (
                    <Link to={`/tx/${transaction}`}>
                      <span>{transaction}</span>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </Fragment>
  )
}

export default Transaction
