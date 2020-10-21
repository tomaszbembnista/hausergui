import { SpaceResourceApi, SpaceDTO } from "./srvapi/index";
import { forkJoin, of, Observable } from 'rxjs';

export default class GetSpaces {
    getSpaceDetails(spaceId: number, subspaces: SpaceDTO[]): Observable<[SpaceDTO, SpaceDTO[]]> {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi();

        let defaultSpace: SpaceDTO = {
            id: spaceId,
            name: "Spaces",
            parentId: undefined,
            slug: undefined
        }

        let spaceObservable: Promise<SpaceDTO> = of(defaultSpace).toPromise();

        let subspace: SpaceDTO | undefined = subspaces.find(space => {
            return space.id === spaceId;
        });

        if (subspace) {
            spaceObservable = of(subspace).toPromise();
        }
        else if (spaceId !== -1) {
            spaceObservable = spacesResource.getSpaceUsingGET({ id: spaceId });
        }

        let getResponse = forkJoin([
            spaceObservable,
            spacesResource.getSpacesBelongingToSpaceUsingGET({ id: spaceId })
        ]);

        return getResponse;
    }
}