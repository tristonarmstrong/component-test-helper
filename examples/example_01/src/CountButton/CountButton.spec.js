import { render } from "@testing-library/react"
import CountButton from "./CountButton"
import { CountButtonTestHelper } from "./testUtils"

const buttonHelper = new CountButtonTestHelper()

describe('CountButton', () => {
    it('renders without crashing', async () => {
        render(<CountButton/>)
        expect(await buttonHelper.get()).toBeInTheDocument()
    })
    it('should be able to count by one', async () => {
        render(<CountButton/>)
        await buttonHelper.expectToIncrementByOne()
    })
    it('should be able to continue counting', async () => {
        render(<CountButton/>)
        await buttonHelper.expectToIncrementByTwo()
        await buttonHelper.expectToIncrementByTwo()
        await buttonHelper.expectToIncrementByTwo()
    })
    
})