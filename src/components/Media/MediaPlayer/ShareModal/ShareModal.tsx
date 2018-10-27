import * as React from 'react'
import * as Modal from 'react-modal'
import { Button, FormGroup, Input, InputGroup,
  InputGroupAddon, Label } from 'reactstrap'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { copyToClipboard } from 'lib/util'

type Props = {
  hideModal: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  playerClipLink?: string
  playerEpisodeLink?: string
  playerPodcastLink?: string
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
    copyToClipboard(this.props.playerClipLink)
    this.setState({ lastCopied: 'clip' })
    setTimeout(() => {
      this.setState({ lastCopied: undefined })
    }, 3000)
  }

  handleEpisodeCopy () {
    copyToClipboard(this.props.playerEpisodeLink)
    this.setState({ lastCopied: 'episode' })
    setTimeout(() => {
      this.setState({ lastCopied: undefined })
    }, 3000)
  }

  handlePodcastCopy () {
    copyToClipboard(this.props.playerPodcastLink)
    this.setState({ lastCopied: 'podcast' })
    setTimeout(() => {
      this.setState({ lastCopied: undefined })
    }, 3000)
  }

  render () {
    const { hideModal, isOpen, playerClipLink, playerEpisodeLink,
      playerPodcastLink } = this.props
    const { lastCopied } = this.state

    return (
      <Modal
        contentLabel='Share links'
        isOpen={isOpen}
        onRequestClose={hideModal}
        portalClassName='mp-share-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        <h4>
          Share
        </h4>
        <CloseButton onClick={hideModal} />
        {
          playerClipLink &&
          <FormGroup>
            <Label for='share-copy-clip'>Clip</Label>
            <InputGroup id='share-copy-clip'>
              <Input
                readOnly={true}
                value={playerClipLink} />
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
          playerEpisodeLink &&
          <FormGroup>
            <Label for='share-copy-episode'>Episode</Label>
            <InputGroup id='share-copy-episode'>
              <Input
                readOnly={true}
                value={playerEpisodeLink} />
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
          playerPodcastLink &&
          <FormGroup>
            <Label for='share-copy-podcast'>Podcast</Label>
            <InputGroup id='share-copy-podcast'>
              <Input
                readOnly={true}
                value={playerPodcastLink} />
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
