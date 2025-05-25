<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../../css/styles.css">

    <title>Events Dashboard</title>
</head>
<body class="body-event-dashboard">
            <?php 
            // include __DIR__ . '/../../templates/layout/components/menu_dashboard.html'; 
            ?>
    <div class="main-container">
        <h1>ÉVÈNEMENTS</h1>
        <div class="calendar-container">
            <div class="calendar">
                <div class="header-calendar">
                    <button>&lt;</button>
                    <div class="month">JUILLET<br>2025</div>
                    <button>&gt;</button>
                </div>
                <div class="day-names">
                    <div>LUNDI</div>
                    <div>MARDI</div>
                    <div>MERCREDI</div>
                    <div>JEUDI</div>
                    <div>VENDREDI</div>
                    <div>SAMEDI</div>
                    <div>DIMANCHE</div>
                </div>
                <div class="grid-calendar">
                    <div class="day adjacent">30</div>
                    <div class="day">1</div>
                    <div class="day">2</div>
                    <div class="day">3</div>
                    <div class="day">4</div>
                    <div class="day">5</div>
                    <div class="day">6</div>

                    <div class="day">7</div>
                    <div class="day">8</div>
                    <div class="day">9</div>
                    <div class="day">10</div>
                    <div class="day">11</div>
                    <div class="day">12</div>
                    <div class="day">13</div>

                    <div class="day">14</div>
                    <div class="day">15</div>
                    <div class="day">16</div>
                    <div class="day">17</div>
                    <div class="day">18</div>
                    <div class="day">19</div>
                    <div class="day">20</div>

                    <div class="day">21</div>
                    <div class="day">22</div>
                    <div class="day">23</div>
                    <div class="day">24</div>
                    <div class="day">25</div>
                    <div class="day">26</div>
                    <div class="day">27</div>

                    <div class="day">28</div>
                    <div class="day">29</div>
                    <div class="day">30</div>
                    <div class="day">31</div>
                    <div class="day adjacent">1</div>
                    <div class="day adjacent">2</div>
                    <div class="day adjacent">3</div>
                </div>
                </div>

        </div>

        <div class="responsive labels-container">
            <div class="label-para"><p>Para-Aviron</p></div>
            <div class="label-avifit"><p>Avifit</p></div>
            <div class="label-indoor"><p>Aviron Indoor</p></div>
            <div class="label-riviere"><p>Aviron en rivière</p></div>
            <div class="label-sante"><p>Aviron Santé et bien-être</p></div>
        </div>

            


        <div class="responsive event-table">
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
        </div>
       
        <div class="responsive cta-container">
            <a class="btn-primary" href="#">Ajouter un évènement</a>
        </div>
    </div>
</body>
</html>