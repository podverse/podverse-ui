import * as React from 'react'
import * as Modal from 'react-modal'
import { Form, FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { checkIfLoadingOnFrontEnd } from 'lib/utility'
const ClipboardJS = require('clipboard')

type Props = {
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  playerClipLinkHref?: string
  playerEpisodeLinkHref?: string
  playerPodcastLinkHref?: string
  t: any
}

type State = {
  lastCopied?: string
}

const customStyles = {
  content: {
    bottom: 'unset',
    left: '50%',
    maxWidth: '420px',
    overflow: 'unset',
    right: 'unset',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}

export class ShareModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      lastCopied: undefined
    }
  }

  _onAfterOpen = () => {
    new ClipboardJS('.share-modal .btn-primary')
  }

  handleClipCopy = () => {
    this.setState({ lastCopied: 'clip' })
    setTimeout(() => {
      this.setState({ lastCopied: undefined })
    }, 3000)
  }

  handleEpisodeCopy = () => {
    this.setState({ lastCopied: 'episode' })
    setTimeout(() => {
      this.setState({ lastCopied: undefined })
    }, 3000)
  }

  handlePodcastCopy = () => {
    this.setState({ lastCopied: 'podcast' })
    setTimeout(() => {
      this.setState({ lastCopied: undefined })
    }, 3000)
  }

  render () {
    const { handleHideModal, isOpen, playerClipLinkHref, playerEpisodeLinkHref,
      playerPodcastLinkHref, t } = this.props
    const { lastCopied } = this.state

    let appEl
    if (checkIfLoadingOnFrontEnd()) {
      appEl = document.querySelector('body')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel='Share links'
        isOpen={isOpen}
        onAfterOpen={this._onAfterOpen}
        onRequestClose={handleHideModal}
        portalClassName='share-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <h3><FontAwesomeIcon icon='share' /> &nbsp;{t('Share')}</h3>
        <CloseButton onClick={handleHideModal} />
        <Form>
          {
            playerClipLinkHref &&
              <FormGroup>
                <Label for='share-copy-clip'>{t('Clip')}</Label>
                <InputGroup id='share-copy-clip'>
                  <Input
                    id='share-copy-clip-input'
                    readOnly={true}
                    value={playerClipLinkHref} />
                  <InputGroupAddon
                    addonType='append'>
                    <Button
                      color='primary'
                      dataclipboardtarget='#share-copy-clip-input'
                      onClick={this.handleClipCopy}>
                      {
                        lastCopied === 'clip' ? t('Copied') : t('Copy')
                      }
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
          }
          {
            playerEpisodeLinkHref &&
              <FormGroup>
                <Label for='share-copy-episode'>{t('Episode')}</Label>
                <InputGroup id='share-copy-episode'>
                  <Input
                    id='share-copy-episode-input'
                    readOnly={true}
                    value={playerEpisodeLinkHref} />
                  <InputGroupAddon
                    addonType='append'>
                    <Button
                      color='primary'
                      dataclipboardtarget='#share-copy-episode-input'
                      onClick={this.handleEpisodeCopy}>
                      {
                        lastCopied === 'episode' ? 'Copied!' : 'Copy'
                      }
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
          }
          {
            playerPodcastLinkHref &&
              <FormGroup>
                <Label for='share-copy-podcast'>{t('Podcast')}</Label>
                <InputGroup id='share-copy-podcast'>
                  <Input
                    id='share-copy-podcast-input'
                    readOnly={true}
                    value={playerPodcastLinkHref} />
                  <InputGroupAddon
                    addonType='append'>
                    <Button
                      color='primary'
                      dataclipboardtarget='#share-copy-podcast-input'
                      onClick={this.handlePodcastCopy}>
                      {
                        lastCopied === 'podcast' ? t('Copied') : t('Copy')
                      }
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
          }
        </Form>
      </Modal>
    )
  }
}
