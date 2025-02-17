import React, { Component } from 'react';
import { DiagramMakerComponents } from 'diagram-maker';
import './index.less';
import type { Definition } from '../../../interface/addon';
import Translation from '../../../components/Translation';

type Props = {
  id: string;
  workflowId: string;
  data?: any;
  definitions: Definition[];
};

class WorkFlowPannel extends Component<Props> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { definitions } = this.props;
    return (
      <div className="workflow-pannel-container">
        <div className="hl">
          <Translation>Workflow Step Type</Translation>
        </div>
        <div className="node-container">
          {definitions.map((item) => {
            return (
              <div
                key={item.name}
                className="node-item"
                data-event-target={true}
                data-draggable={true}
                data-type={DiagramMakerComponents.POTENTIAL_NODE}
                data-id={item.name}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default WorkFlowPannel;
