/* eslint-disable import/no-unresolved */
import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { countPercentage } from '../../../utils/common/countPercentage';
import { pluralizeString } from '../../../utils/components/pluralizeString';
import { useSwiperRef } from '../../../utils/lib/useSwiperRef';
import { Button } from '../../UI/Button/Button';
import { CircularProgress } from '../../UI/CircularProgress/CircularProgress';
import { LearningSvgSelector } from '../LearningSvgSelector';
import { btnStyles } from '../Stages/FirstStage/FirstStage';
import s from './CompletionMessage.module.scss';

type ListProgress = {
  words: number;
  wordsLearned: number;
  name: string;
  id: number;
};

type Props = {
  progresses: ListProgress[];
};

function WordsInfo({
  words,
  wordsLearned,
}: {
  words: number;
  wordsLearned: number;
}) {
  return (
    <div className={s.completion_words}>
      {`${wordsLearned} of ${pluralizeString(words)}`}
    </div>
  );
}

export default function CompletionMessage({ progresses }: Props) {
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();

  return (
    <div className={s.completion_container}>
      <h3 className={s.completion_title}>Congratulations!</h3>
      <h6 className={s.completion_description}>
        You have successfully completed the learning of few lists, here is your
        progress:
      </h6>

      <div className={s.completion_progresses}>
        <button type="button" className={s.completion_btn} ref={prevElRef}>
          <LearningSvgSelector id="arrow-left" />
        </button>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl, nextEl }}
          slidesPerView={1}
        >
          {progresses.map((item: ListProgress) => {
            const progress = countPercentage(item.wordsLearned, item.words);
            return (
              <SwiperSlide key={item.id}>
                <div className={s.completion_progress}>
                  <CircularProgress
                    width={200}
                    height={200}
                    progressValue={progress}
                    bgColor="#353742"
                    circleStroke={10}
                    asset={(
                      <WordsInfo
                        words={item.words}
                        wordsLearned={item.wordsLearned}
                      />
                    )}
                  />
                </div>
                <p className={s.completion_listname}>{item.name}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button type="button" className={s.completion_btn} ref={nextElRef}>
          <LearningSvgSelector id="arrow-right" />
        </button>
      </div>
      <Button
        styles={{ ...btnStyles, padding: '6px 14px', marginTop: '30px' }}
        type="primary"
        onClick={() => console.log()}
      >
        finish
      </Button>
    </div>
  );
}