import React from "react";
import "./PopupBox.css"
type propType = {
    header: React.ReactNode | string,
    visible: boolean
}
class PopupBox extends React.Component<propType, { boxVisible: boolean }>{
    constructor(props: propType) {
        super(props);
        this.state = {
            boxVisible: false,
        }
    }
    keyListener = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            this.setState({ boxVisible: this.state.boxVisible?false:true })
        }
    }
    render(): React.ReactNode {
        return (
            <div className="toolBoxContainer" style={(typeof this.props.visible === "undefined" ? this.state.boxVisible : this.props.visible !== this.state.boxVisible) ? {} : { display: "none" }} tabIndex={-1} onKeyDown={this.keyListener}>
                <div className="toolBoxMaskLayer" onClick={() => this.setState({ boxVisible: this.state.boxVisible?false:true })}></div>
                <div className="toolBoxItself">
                    <div className="toolBoxHeaderDiv">
                        {this.props.header}
                        <div onClick={() => this.setState({ boxVisible: this.state.boxVisible?false:true })} style={{ marginLeft: "auto", position: "relative", bottom: "16px", cursor: "pointer" }}>x</div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default PopupBox;