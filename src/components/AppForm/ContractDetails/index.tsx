import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty } from 'lodash'
import * as Yup from 'yup'
import { Formik, FieldArray } from 'formik'
import { Form, Text, FormButton, Tags } from 'elements'
import { Icon } from 'sharedComponent'

export default class ContractDetails extends Component {
  public init = {
    name: '',
    address: '',
    network: '',
    tags: [],
  }

  public render() {
    return (
      <Formik
        initialValues={{ ...this.init }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(3, 'Name must be at least 3 characters long.')
            .required('Name is required.'),
          address: Yup.string().required('Address is required.'),
          network: Yup.string().required('Network is required.'),
          tags: Yup.array(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          dirty,
          /* and other goodies */
        }) => {
          return (
            <Form.Box onSubmit={handleSubmit}>
              <Form.Content>
                <Text size={1.75} themeColor bold>
                  Let’s narrow down your options
                </Text>
                <Form.Inputs>
                  <Form.Label>DApp Name</Form.Label>
                  <Form.Input
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </Form.Inputs>
                <Form.Inputs>
                  <Form.Label>Contract Address</Form.Label>
                  <Form.Input
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                </Form.Inputs>
                <Form.Inputs>
                  <Form.Label>Network</Form.Label>
                  <Form.Select
                    name="network"
                    value={values.network}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ display: 'block' }}
                  >
                    <Form.Option value="" label="Select a network" />
                    <Form.Option value="ropsten" label="ropsten" />
                    <Form.Option value="rinkeby" label="rinkeby" />
                    <Form.Option value="mainnet" label="mainnet" />
                  </Form.Select>
                </Form.Inputs>
                <Form.Inputs>
                  <Form.Label>Tags</Form.Label>
                  <FieldArray
                    name="tags"
                    render={arrayHelpers => (
                      <Form.Tag>
                        <Tags>
                          {values.tags && values.tags.length > 0 ? (
                            values.tags.map((tag, index) => (
                              <button
                                type="button"
                                key={index}
                                className="tag"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                              >
                                {tag} <Icon name="cross" size={12} />
                              </button>
                            ))
                          ) : (
                            <div />
                          )}
                          <Form.TagInput
                            onKeyPress={e => {
                              if (e.key === 'Enter') {
                                arrayHelpers.push(e.target.value)
                                e.target.value = ''
                              }
                            }}
                          />
                        </Tags>
                      </Form.Tag>
                    )}
                  />
                </Form.Inputs>
              </Form.Content>
              <Form.Bottom>
                <FormButton
                  height={'30px'}
                  width={'320px'}
                  type="submit"
                  disabled={!isEmpty(errors) || !dirty}
                >
                  <Text size={1.75}>
                    Continue <FontAwesomeIcon icon="angle-right" size="lg" />
                  </Text>
                </FormButton>
              </Form.Bottom>
            </Form.Box>
          )
        }}
      </Formik>
    )
  }
}