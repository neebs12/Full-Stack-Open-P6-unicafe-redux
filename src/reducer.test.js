import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = { // in scope for all tests
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state) // ensures that the state is NOT mutated
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state) // ensures that the state is NOT mutated
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })  

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state) // ensures that the state is NOT mutated
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })    

  test('two goods increments twice', () => {
    // ARRANGE
    const action = {
      type: 'GOOD'
    }

    const state = initialState

    // ACT
    deepFreeze(state) // minor ASSERT for frozen object
    let newState = counterReducer(state, action)
    newState = counterReducer(newState, action) // twice

    // ASSERT
    expect(newState).toEqual({
      good: 2,
      ok: 0,
      bad: 0
    })
  })
})