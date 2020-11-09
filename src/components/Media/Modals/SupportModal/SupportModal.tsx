import * as React from 'react'
import * as Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { ImageSquare } from 'components/Image/ImageSquare'
import { checkIfLoadingOnFrontEnd } from 'lib/utility'

type Props = {
  episodeFunding: any[]
  handleHideModal?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
  podcastFunding: any[]
  podcastImageUrl?: string
  podcastTitle?: string
  podcastValue: any
  t: any
}

type State = {}

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

export class SupportModal extends React.Component<Props, State> {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { episodeFunding, handleHideModal, isOpen, podcastFunding, podcastImageUrl, 
      podcastTitle, t } = this.props

    let appEl
    if (checkIfLoadingOnFrontEnd()) {
      appEl = document.querySelector('body')
    }

    const header = (
      <div className='support-modal__header'>
        <h3><FontAwesomeIcon icon='donate' /> &nbsp;{t('Support')}</h3>
        <div className='support-modal-header__close'>
          <CloseButton onClick={handleHideModal} />
        </div>
      </div>
    )

    const createFundingNode = (option) => (
      <React.Fragment>
        <a className='support-modal__option' href={option.url} target='_blank' rel='noreferrer'>
          {option.value}
        </a>
        <br />
      </React.Fragment>
    )

    const createFundingNodes = (options) => {
      const nodes = [] as any
      if (Array.isArray(options)) {
        for (const option of options) {
          if (option.url && option.value) {
            nodes.push(createFundingNode(option))
          }
        }
      }
      return nodes
    }

    const podcastFundingNodes = createFundingNodes(podcastFunding)
    const episodeFundingNodes = createFundingNodes(episodeFunding)

    return (
      <Modal
        appElement={appEl}
        contentLabel='Support this podcast'
        isOpen={isOpen}
        onRequestClose={handleHideModal}
        portalClassName='support-modal over-media-player'
        shouldCloseOnOverlayClick
        style={customStyles}>
        {header}
        <div className='support-modal__info'>
          <div className='support-modal-info__podcast-image'>
            <ImageSquare
              imageUrl={podcastImageUrl}
              size='3.75rem' />
          </div>
          <div className='support-modal-info__podcast-title'>
            <span>{podcastTitle}</span>
          </div>
        </div>
        <div className='scrollable-area'>
          {
            (podcastFundingNodes && podcastFundingNodes.length > 0) &&
              <div className='support-modal__group'>
                <h4>{t('Podcast Links')}</h4>
                {podcastFundingNodes}
              </div>
          }
          {
            (episodeFundingNodes && episodeFundingNodes.length > 0) &&
              <div className='support-modal__group'>
                <h4>{t('Episode Links')}</h4>
                {episodeFundingNodes}
              </div>
          }
        </div>
      </Modal>
    )
  }
}
