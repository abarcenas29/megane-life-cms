import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

/**
 * Direct selector to the posts state domain
 */
const selectPostsDomain = () => state => state.get('posts')
const selectFormDomain = () => state => state.get('form').get('standardForm')

/**
 * Other specific selectors
 */
const formValueSelector = () => createSelector(
  selectFormDomain(),
  subState => subState ? subState.get('values') : fromJS({})
)

/**
 * Default selector used by Posts
 */

const makeSelectPosts = () => createSelector(
  selectPostsDomain(),
  (substate) => substate.toJS()
)

export default makeSelectPosts
export {
  selectPostsDomain,
  formValueSelector
}
