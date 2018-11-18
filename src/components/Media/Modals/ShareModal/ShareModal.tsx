import * as React from 'react'
import * as Modal from 'react-modal'
import { Button, FormGroup, Input, InputGroup,
  InputGroupAddon, Label } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { copyToClipboard } from 'lib/util'

type Props = {
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  playerClipLinkHref?: string
  playerEpisodeLinkHref?: string
  playerPodcastLinkHref?: string
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

class ShareModal extends React.Component<Props, State> {

  constructor (props) {
    super(props)

    this.state = {
      lastCopied: undefined
    }

    this.handleClipCopy = this.handleClipCopy.bind(this)
    this.handleEpisodeCopy = this.handleEpisodeCopy.bind(this)
    this.handlePodcastCopy = this.handlePodcastCopy.bind(this)
  }

  handleClipCopy () {
    copyToClipboard(this.props.playerClipLinkHref)
    this.setState({ lastCopied: 'clip' })
    setTimeout(() => {
      this.setState({ lastCopied: undefined })
    }, 3000)
  }

  handleEpisodeCopy () {
    copyToClipboard(this.props.playerEpisodeLinkHref)
    this.setState({ lastCopied: 'episode' })
    setTimeout(() => {
      this.setState({ lastCopied: undefined })
    }, 3000)
  }

  handlePodcastCopy () {
    copyToClipboard(this.props.playerPodcastLinkHref)
    this.setState({ lastCopied: 'podcast' })
    setTimeout(() => {
      this.setState({ lastCopied: undefined })
    }, 3000)
  }

  render () {
    const { hideModal, isOpen, playerClipLinkHref, playerEpisodeLinkHref,
      playerPodcastLinkHref } = this.props
    const { lastCopied } = this.state

    let appEl
    // @ts-ignore
    if (process.browser) {
      appEl = document.querySelector('body')
    }

    return (
      <Modal
        appElement={appEl}
        contentLabel='Share links'
        isOpen={isOpen}
        onRequestClose={hideModal}
        portalClassName='mp-share-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <h4><FontAwesomeIcon icon='share' /> &nbsp;Share</h4>
        <CloseButton onClick={hideModal} />
        {
          playerClipLinkHref &&
          <FormGroup>
            <Label for='share-copy-clip'>Clip</Label>
            <InputGroup id='share-copy-clip'>
              <Input
                readOnly={true}
                value={playerClipLinkHref} />
              <InputGroupAddon
                addonType='append'>
                <Button onClick={this.handleClipCopy}>
                  {
                    lastCopied === 'clip' ? 'Copied!' : 'Copy'
                  }
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        }
        {
          playerEpisodeLinkHref &&
          <FormGroup>
            <Label for='share-copy-episode'>Episode</Label>
            <InputGroup id='share-copy-episode'>
              <Input
                readOnly={true}
                value={playerEpisodeLinkHref} />
              <InputGroupAddon
                addonType='append'>
                <Button onClick={this.handleEpisodeCopy}>
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
            <Label for='share-copy-podcast'>Podcast</Label>
            <InputGroup id='share-copy-podcast'>
              <Input
                readOnly={true}
                value={playerPodcastLinkHref} />
              <InputGroupAddon
                addonType='append'>
                <Button onClick={this.handlePodcastCopy}>
                  {
                    lastCopied === 'podcast' ? 'Copied!' : 'Copy'
                  }
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        }
      </Modal>
    )
  }
}

export default ShareModal
