<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../css/styles.css">

    <title>Events Dashboard</title>
</head>
<body>
    <div class="main-container">
        <h1>ÉVÈNEMENTS</h1>
        <div class="responsive calendar-container">
            <div class="calendar">

            </div>
            <div class="label-container">
                <div class="label">
                    <div class="picto-label">
                        <img>
                    </div>
                    <div class="wording-label">
                        <p></p>
                    </div>
                </div>
                <div class="label">
                    <div class="picto-label">
                        <img>
                    </div>
                    <div class="wording-label">
                        <p></p>
                    </div>
                </div>
                <div class="label">
                    <div class="picto-label">
                        <img>
                    </div>
                    <div class="wording-label">
                        <p></p>
                    </div>
                </div>
                <div class="label">
                    <div class="picto-label">
                        <img>
                    </div>
                    <div class="wording-label">
                        <p></p>
                    </div>
                </div>
                <div class="label">
                    <div class="picto-label">
                        <img>
                    </div>
                    <div class="wording-label">
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
<!-- (NATHAN) -->
        <!-- <div class="responsive events-container">
            <div class="events-table">
                <h2></h2>
                <div class="content-table">
                    <div class="content-titles">
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                    <div class="content-row">
                        <div class="content-name">
                            <div class="img-name">
                                <img>
                            </div>
                            <div class="wording-name">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-description">
                            <p></p>
                        </div>

                        <div class="content-event">
                            <div class="wording-event">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-date">
                            <p></p>
                        </div>

                        <a href="#">Modifier</a>
                    </div>
                    <div class="content-row">
                        <div class="content-name">
                            <div class="img-name">
                                <img>
                            </div>
                            <div class="wording-name">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-description">
                            <p></p>
                        </div>

                        <div class="content-event">
                            <div class="wording-event">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-date">
                            <p></p>
                        </div>

                        <a href="#">Modifier</a>
                    </div>
                    <div class="content-row">
                        <div class="content-name">
                            <div class="img-name">
                                <img>
                            </div>
                            <div class="wording-name">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-description">
                            <p></p>
                        </div>

                        <div class="content-event">
                            <div class="wording-event">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-date">
                            <p></p>
                        </div>

                        <a href="#">Modifier</a>
                    </div>
                    <div class="content-row">
                        <div class="content-name">
                            <div class="img-name">
                                <img>
                            </div>
                            <div class="wording-name">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-description">
                            <p></p>
                        </div>

                        <div class="content-event">
                            <div class="wording-event">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-date">
                            <p></p>
                        </div>

                        <a href="#">Modifier</a>
                    </div>
                    <div class="content-row">
                        <div class="content-name">
                            <div class="img-name">
                                <img>
                            </div>
                            <div class="wording-name">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-description">
                            <p></p>
                        </div>

                        <div class="content-event">
                            <div class="wording-event">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-date">
                            <p></p>
                        </div>

                        <a href="#">Modifier</a>
                    </div>
                    <div class="content-row">
                        <div class="content-name">
                            <div class="img-name">
                                <img>
                            </div>
                            <div class="wording-name">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-description">
                            <p></p>
                        </div>

                        <div class="content-event">
                            <div class="wording-event">
                                <p></p>
                            </div>
                        </div>

                        <div class="content-date">
                            <p></p>
                        </div>

                        <a href="#">Modifier</a>
                    </div>
                </div>
            </div>
        </div> -->
        
        <!-- (CHARBEL) -->
          <section class="event-table-section">
 
  <div class="event-table__container">
    <div class="event-table__header">
      <h2 class="event-table__title">Liste des évènements</h2>
    </div>
    <div class="event-table__wrapper">
      <table class="event-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Type d’évènement</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="event-table__name">
                <img src="https://placehold.co/40x40" alt="Avatar" class="event-table__avatar">
                <span>Portes Ouvertes</span>
              </div>
            </td>
            <td>Journée Porte Ouverte</td>
            <td>
              <span class="event-table__type">Avifit</span>
            </td>
            <td>15/07/2025</td>
            <td>
              <button class="event-table__edit">Modifier</button>
            </td>
          </tr>
          <tr>
            <td>
              <div class="event-table__name">
                <img src="https://placehold.co/40x40" alt="Avatar" class="event-table__avatar">
                <span>Portes Ouvertes</span>
              </div>
            </td>
            <td>Journée Porte Ouverte</td>
            <td>
              <span class="event-table__type">Aviron Indoor</span>
            </td>
            <td>15/07/2025</td>
            <td>
              <button class="event-table__edit">Modifier</button>
            </td>
          </tr>
       
        </tbody>
      </table>
    </div>
  </div>
</section>

        <div class="responsive cta-container">
            <div class="cta-add-event">
                <a href="#">Ajouter un évènement</a>
            </div>
        </div>
    </div>
</body>
</html>