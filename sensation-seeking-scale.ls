Polymer {
  is: 'sensation-seeking-scale'
  properties: {
    sssv_questions: {
      type: Array
      value: [
        {
          first: 'I like "wild" uninhibited parties'
          second: 'I prefer quiet parties with good conversation'
        }
        {
          first: 'There are some movies I enjoy seeing a second or even a third time'
          second: "I can't stand watching a movie that I've seen before"
        }
        {
          first: 'I often wish I could be a mountain climber'
          second: "I can't understand people who risk their necks climbing mountains"
        }
        {
          first: "I dislike all body odors"
          second: "I like some of the earthly body smells"
        }
        {
          first: "I get bored seeing the same old faces"
          second: "I like the comfortable familiarity of everyday friends"
        }
        {
          first: "I like to explore a strange city or section of town by myself, even if it means getting lost"
          second: "I prefer a guide when I am in a place I don't know well"
        }
        {
          first: 'I dislike people who do or say things just to shock or upset others'
          second: 'When you can predict almost everything a person will do and say he must be a bore'
        }
        {
          first: "I usually don't enjoy a movie where I can predict what will happen in advance"
          second: "I don't mind watching a movie or a play where I can predict what will happen in advance"
        }
        {
          first: "I have tried marijuana or would like to"
          second: "I would never smoke marijuana"
        }
        {
          first: "I would not like to try any drug which might produce strange and dangerous effects on me"
          second: "I would like to try some of the new drugs that produce hallucinations"
        }
        {
          first: "A sensible person avoids activities that are dangerous"
          second: "I sometimes like to do things that are a little frightening"
        }
        {
          first: 'I dislike "swingers" (people who are uninhibited and free about sex)'
          second: 'I enjoy the company of real "swingers"'
        }
        {
          first: 'I find that stimulants make me uncomfortable'
          second: 'I often like to get high (drinking liquor or smoking marijuana)'
        }
        {
          first: 'I like to try new foods that I have never tasted before'
          second: 'I order the dishes with which I am familiar, so as to avoid disappointment and unpleasantness'
        }
        {
          first: 'I enjoy looking at home movies or travel slides'
          second: "Looking at someone's home movies or travel slides bores me tremendously"
        }
        {
          first: 'I would like to take up the sport of water skiing'
          second: 'I would not like to take up water skiing'
        }
        {
          first: 'I would like to try surf boarding'
          second: 'I would not like to try surf boarding'
        }
        {
          first: 'I would like to take off on a trip with no preplanned or definite routes, or timetable'
          second: 'When I go on a trip I like to plan my route and timetable fairly carefully'
        }
        {
          first: 'I prefer the "down to earth" kinds of people as friends'
          second: 'I would like to make friends in some of the "far out" groups like artists or "punks"'
        }
        {
          first: 'I would not like to learn to fly an airplane'
          second: 'I would like to learn to fly an airplane'
        }
        {
          first: 'I prefer the surface of the water to the depths'
          second: 'I would like to go scuba diving'
        }
        {
          first: 'I would like to meet some persons who are homosexual (men or women)'
          second: 'I stay away from anyone I suspect of being "gay or lesbian"'
        }
        {
          first: 'I would like to try parachute jumping'
          second: 'I would never want to try jumping out of a plane with or without a parachute'
        }
        {
          first: 'I prefer friends who are excitingly unpredictable'
          second: 'I prefer friends who are reliable and predictable'
        }
        {
          first: 'I am not interested in experience for its own sake'
          second: 'I like to have new and exciting experiences and sensations even if they are a little frightening, unconventional or illegal'
        }
        {
          first: 'The essence of good art is in its clarity, symmetry of form and harmony of colors'
          second: 'I often find beauty in the "clashing" colors and irregular forms of modern paintings'
        }
        {
          first: 'I enjoy spending time in the familiar surroundings of home'
          second: 'I get very restless if I have to stay around home for any length of time'
        }
        {
          first: 'I like to dive off the high board'
          second: "I don't like the feeling I get when standing on the high board (or I don't go near it at all)"
        }
        {
          first: 'I like to date members of the opposite sex who are physically exciting'
          second: 'I like to date members of the opposite sex who share my values'
        }
        {
          first: 'Heavy drinking usually ruins a party because some people get loud and boisterous'
          second: 'Keeping the drinks full is the key to a good party'
        }
        {
          first: 'The worst social sin is to be rude'
          second: 'The worse social sin is to be a bore'
        }
        {
          first: 'A person should have considerable sexual experience before marriage'
          second: "It's better if two married persons begin their sexual experiences with each other"
        }
        {
          first: 'Even if I had the money I would not care to associate with flight rich persons like those in the "jet set"'
          second: 'I could conceive of myself seeking pleasures around the world with the "jet set"'
        }
        {
          first: 'I like people who are sharp and witty even if they do sometimes insult others'
          second: 'I dislike people who have their fun at the expense of hurting the feelings of others'
        }
        {
          first: 'There is altogether too much portrayal of sex in movies'
          second: 'I enjoy watching many of the "sexy" scenes in movies'
        }
        {
          first: 'I feel best after taking a couple of drinks'
          second: 'Something is wrong with people who need liquor to feel good'
        }
        {
          first: 'People should dress according to some standard of taste, neatness, and style'
          second: 'People should dress in individual ways even if the effects are sometimes strange'
        }
        {
          first: 'Sailing long distances in small sailing crafts is foolhardy'
          second: 'I would like to sail a long distance in a small but seaworthy sailing craft'
        }
        {
          first: 'I have no patience with dull or boring persons'
          second: 'I find something interesting in almost every person I talk to'
        }
        {
          first: 'Skiing down a high mountain slope is a good way to end up on crutches'
          second: 'I think I would enjoy the sensations of skiing very fast down a high mountain slope'
        }
      ]
    }
  }
  plusone: (x) -> x+1
}