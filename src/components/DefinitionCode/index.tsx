import React from 'react';
import * as monaco from 'monaco-editor';
import defineTheme from '../DefinitionCode/theme';

type Props = {
  containerId: string;
  value?: string;
  readOnly?: boolean;
  language: string;
  fileUrl?: string;
  runtime?: any;
  'data-meta'?: string;
  id?: string;
  onChange?: (params: any) => void;
};

class DefinitionCode extends React.Component<Props> {
  editor?: monaco.editor.IStandaloneCodeEditor;

  componentDidMount() {
    const {
      containerId,
      value = '',
      language,
      readOnly,
      onChange,
      fileUrl = `//b.txt`,
    } = this.props;
    const container: any = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';
    }
    if (defineTheme) {
      monaco.editor.defineTheme(containerId, defineTheme as any);
      monaco.editor.setTheme(containerId);
    }
    const modelUri = monaco.Uri.parse(`${containerId}:${fileUrl}`);
    let model = monaco.editor.getModel(modelUri);
    if (!model) {
      model = monaco.editor.createModel(value, language, modelUri);
      model.setValue(value);
    }
    this.editor = monaco.editor.create(container, {
      value,
      language,
      readOnly,
      minimap: { enabled: false },
      automaticLayout: true,
      model,
      theme: containerId,
    });
    const textModel: monaco.editor.ITextModel | null = this.editor.getModel();
    if (textModel) {
      if (onChange) {
        this.editor.onDidChangeModelContent(() => onChange(textModel.getValue()));
      }
      monaco.editor.setModelLanguage(textModel, language);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { language, value, runtime } = nextProps;
    if (
      language !== this.props.language ||
      runtime !== this.props.runtime ||
      value !== this.props.value
    ) {
      if (this.editor) {
        this.editor.getModel()?.setValue(value || '');
      }
    }
  }
  componentWillUnmount() {
    if (this.editor) {
      this.editor.dispose();
    }
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { id } = this.props;
    return <div id={id} />;
  }
}

export default DefinitionCode;
