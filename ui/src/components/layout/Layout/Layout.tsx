import Header from "../Header"
import { Container } from "@nextui-org/react"

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
    return (
        <Container sm>
            <Header />
            {props.children}
        </Container>
    )
}

export default Layout