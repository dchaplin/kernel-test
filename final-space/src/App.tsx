import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Api} from './api'
import ReactPaginate from 'react-paginate'

type EpisodeType = {
    id: number
    name: string
    imageUrl: string
    airDate: string
    characterImageUrls: string[]
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    background: #f8f9fa;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 100px;
`

const EpisodesContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Episode = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 200px;
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 20px;
`

const EpisodeContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const Image = styled.img`
    width: 320px;
    height: 180px;
    border-radius: 4px;
`
const Details = styled.div`
    width: 240px;
    margin-left: 10px;
`

const Name = styled.div`
    font-weight: 600;
    font-size: 24px;
`

const AirDate = styled.div`
    font-weight: 400;
    font-size: 14px;
`

const CharacterList = styled.div`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
`

const Character = styled.img`
    width: 85px;
    height: 85px;
    margin-left: 10px;
    border-radius: 4px;
`

const StyledPaginate = styled(ReactPaginate)`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding-bottom: 50px;
    justify-content: right;

    li a {
        border-radius: 4px;
        padding: 0.1rem 1rem;
        /* border: gray 1px solid; */
        cursor: pointer;
    }
    li.previous a,
    li.next a,
    li.break a {
        border-color: transparent;
    }
    li.selected a,
    li.active a {
        background-color: #0366d6;
        border-color: transparent;
        color: white;
        min-width: 32px;
    }
    li.disabled a {
        color: grey;
    }
    li.disable,
    li.disabled a {
        cursor: default;
    }
`

function App() {
    const [episodes, setEpisodes] = useState<EpisodeType[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const episodesPerPage = 10
    const pageCount = Math.ceil(episodes.length / episodesPerPage)

    const indexOfLastEpisode = currentPage * episodesPerPage
    const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage
    const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode)

    const onPageChange = ({selected}: {selected: number}) => {
        setCurrentPage(selected + 1)
    }

    useEffect(() => {
        Api.get('').then((data) => {
            setEpisodes(data?.data)
        })
    }, [])

    return (
        <Container>
            <EpisodesContainer>
                {currentEpisodes.map((episode, key) => {
                    return (
                        <Episode key={key}>
                            <EpisodeContentWrapper>
                                <Image src={episode.imageUrl} />
                                <Details>
                                    <Name>{episode.name}</Name>
                                    <AirDate>{episode.airDate}</AirDate>
                                </Details>
                            </EpisodeContentWrapper>

                            <CharacterList>
                                {episode.characterImageUrls.map((characterImageUrl) => {
                                    return <Character src={characterImageUrl} />
                                })}
                            </CharacterList>
                        </Episode>
                    )
                })}

                <StyledPaginate onPageChange={onPageChange} pageCount={pageCount} />
            </EpisodesContainer>
        </Container>
    )
}

export default App
