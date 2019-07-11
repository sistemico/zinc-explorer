import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Link, Redirect } from 'react-router-dom'
import gql from 'graphql-tag'

import Fragment from '../components/Fragment'
import Table from '../components/Table'
import Timestamp from '../components/formatters/Timestamp'

const getClaimsByIssuerQuery = gql`
  query getClaimsByIssuer($address: String!) {
    claimSets(first: 100, orderBy: updatedAt, orderDirection: desc, where: { issuer: $address }) {
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

const getClaimsBySubjectQuery = gql`
  query getClaimsBySubject($address: String!) {
    claimSets(first: 100, orderBy: updatedAt, orderDirection: desc, where: { subject: $address }) {
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
  const queryOptions = { variables: { address: match.params.address } }

  const { loading: loadingByIssuer, error: errorByIssuer, data: { claimSets: byIssuer } = {} } = useQuery(
    getClaimsByIssuerQuery,
    queryOptions,
  )

  const { loading: loadingBySubject, error: errorSubject, data: { claimSets: bySubject } = {} } = useQuery(
    getClaimsBySubjectQuery,
    queryOptions,
  )

  if (loadingByIssuer || loadingBySubject) {
    return <h3>Loading data...</h3>
  }

  if (errorByIssuer || errorSubject) {
    return <Redirect to="/" />
  }

  const data = [...byIssuer, ...bySubject]

  return (
    <Fragment>
      <h3>Address: {match.params.address}</h3>

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
                  {issuer === match.params.address ? (
                    <span>{issuer}</span>
                  ) : (
                    <Link to={`/${issuer}`}>
                      <span>{issuer}</span>
                    </Link>
                  )}
                </td>
                <td>
                  {subject === match.params.address ? (
                    <span>{subject}</span>
                  ) : (
                    <Link to={`/${subject}`}>
                      <span>{subject}</span>
                    </Link>
                  )}
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

export default Transaction
